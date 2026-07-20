import { StudentData } from "@/types";
import { getDB } from "./db";
import { ObjectId } from "mongodb";
import {
	encryptPhone,
	decryptPhone,
	phoneIndex,
	normalizePhone,
	isPhoneCryptoConfigured,
} from "../auth/phoneCrypto";

// Stored shape adds a blind index alongside the (encrypted) phone number. The
// index is what login queries by; the number itself is only ever decrypted for
// display. `phoneIndex` is optional so un-migrated / opt-out rows still read.
type StoredStudent = StudentData & { phoneIndex?: string };

/**
 * Convert an incoming student into its stored form: the phone number is
 * encrypted at rest and a blind index is attached for lookup. A no-op on the
 * number when phone crypto isn't configured (encryptPhone passes it through and
 * phoneIndex returns null), preserving current behavior.
 */
function toStored<T extends StudentData>(student: T): T & { phoneIndex?: string } {
	const idx = phoneIndex(student.studentPhoneNumber);
	const out: T & { phoneIndex?: string } = {
		...student,
		studentPhoneNumber: encryptPhone(student.studentPhoneNumber),
	};
	if (idx) out.phoneIndex = idx;
	return out;
}

/** Decrypt the phone number for display and drop the internal index field. */
function fromStored<T extends { studentPhoneNumber: string; phoneIndex?: string }>(
	doc: T
): T {
	const rest = { ...doc };
	delete (rest as { phoneIndex?: string }).phoneIndex;
	return { ...rest, studentPhoneNumber: decryptPhone(doc.studentPhoneNumber) };
}

/**
* calls mongodb and create new student doc
* */
export async function createStudent(student: StudentData) {
	const db = await getDB();
	const students = db.collection<StoredStudent>("students")

	return await students.insertOne(toStored(student));
}



// update Studnent
export async function updateStudent(student: { _id: string } & StudentData) {
	const { _id, ...withoutId } = student;
	const db = await getDB();
	const students = db.collection<StoredStudent>("students")
	await students.updateOne({ _id: new ObjectId(_id) }, { $set: toStored(withoutId) }, { upsert: false });
	return student._id
}

/**
* calls mongodb and get all students doc
*/
export async function readManyStudent() {
	const db = await getDB();
	const student = db.collection<StoredStudent>("students")
	const docs = await student.find({}).sort({ _id: -1 }).toArray();
	return docs.map(fromStored);
}


export async function readManyStudentFlat() {
	const db = await getDB();
	const student = db.collection<StoredStudent>("students")
	const result = await student
		.find({})
		.sort({ _id: -1 })
		.map((doc) => ({ ...fromStored(doc), _id: doc._id.toString() }))
		.toArray();
	return result
}



export async function readStudent(id: ObjectId) {
	try {
		const db = await getDB();
		const student = db.collection<StoredStudent>("students")
		const doc = await student.findOne({ _id: new ObjectId(id) })
		return doc ? fromStored(doc) : null
	} catch (error) {
		console.log(error)
		return null
	}
}

/** Map of student _id → display name for a set of ids (batch lookup). */
export async function readStudentNames(
	ids: string[]
): Promise<Record<string, string>> {
	if (ids.length === 0) return {};
	const db = await getDB();
	const students = db.collection<StudentData>("students");
	const objIds = ids.filter((id) => ObjectId.isValid(id)).map((id) => new ObjectId(id));
	const docs = await students
		.find({ _id: { $in: objIds } })
		.project<{ _id: ObjectId; name: string }>({ name: 1 })
		.toArray();
	const map: Record<string, string> = {};
	for (const d of docs) map[d._id.toString()] = d.name ?? "익명";
	return map;
}

export async function findStudent(name: string, phoneNumber: string) {
	try {
		const db = await getDB();
		const student = db.collection<StoredStudent>("students")

		// Migrated rows carry a blind index — query by that (never by the
		// non-deterministic ciphertext). Fall back to a plaintext equality match
		// so un-migrated rows still authenticate during the transition.
		if (isPhoneCryptoConfigured()) {
			const idx = phoneIndex(phoneNumber);
			const byIndex = idx
				? await student.findOne({ name, phoneIndex: idx })
				: null;
			if (byIndex) return fromStored(byIndex);
		}

		const byPlain = await student.findOne({
			name,
			studentPhoneNumber: normalizePhone(phoneNumber),
		});
		return byPlain ? fromStored(byPlain) : null;
	} catch (err) {
		console.log(err)
		return null
	}
}

export async function deleteStudent(id: ObjectId) {
	try {
		const db = await getDB();
		const student = db.collection<StudentData>("students")
		const result = await student.deleteOne({ _id: id })
		return { ok: true, deletedCount: result.deletedCount }
	} catch (err) {
		console.log(err)
		return null
	}
}
