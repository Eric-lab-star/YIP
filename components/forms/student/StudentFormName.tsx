import { inputtv } from "@/app/lib/tv/forms/FormStyles";
import { StudentData, StudentDataRegister } from "@/types";
import { UseFormRegister } from "react-hook-form";

const StudentFormName = ({label, register}: {label: "name"|"school" ; register: UseFormRegister<StudentData>}) => {
	return (
		<div>
			<label>이름</label>
			<input  placeholder="이름을 입력하세요"  className={inputtv({size: "l", insert: true})} {...register(label, {required: true})}  />
		</div>
	)
}
export default StudentFormName;
