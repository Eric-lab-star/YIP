"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { ko } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import studentSchema from "@/app/lib/zod/studentSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPhoneNumber } from "@/lib/utils";
import { Control, FieldValues, Path, UseFormWatch } from "react-hook-form";
import {
  studentCreateAction,
  updateStudentAction,
} from "@/app/actions/studentAction";
import { PlusIcon, Trash2Icon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { redirect } from "next/navigation";
import { Booklist } from "@/app/dashBoard/books";

type StudentSchema = z.infer<typeof studentSchema>;

interface FormInputProps<T extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  id: string;
  placeholder?: string;
  transform?: (input: string) => string;
}

const CLASS_TITLES = [
  { value: "hd_class", label: "아두이노(수업)" },
  { value: "research", label: "연구" },
  { value: "bridge", label: "도브" },
  { value: "Tour of Python", label: "Tour of Python" },
  { value: "Spaceship Captain", label: "Spaceship Captain" },
  { value: "Simple Web Dev", label: "Simple Web Dev" },
  { value: "AI Developer", label: "AI Developer" },
] as const;

const DAYS = [
  { value: "mon", label: "월요일" },
  { value: "tue", label: "화요일" },
  { value: "wed", label: "수요일" },
  { value: "thur", label: "목요일" },
  { value: "fri", label: "금요일" },
  { value: "sat", label: "토요일" },
  { value: "sun", label: "일요일" },
] as const;

const BOOK_TITLES = [
  { value: "Tour of Python", label: "Tour of Python" },
  { value: "Spaceship Captain", label: "Spaceship Captain" },
  { value: "Simple Web Dev", label: "Simple Web Dev" },
  { value: "AI Developer", label: "AI Developer" },
] as const;

const DEFAULT_CLASS: StudentSchema["class"][number] = {
  title: "Tour of Python",
  day: "mon",
  startTime: "14:00",
  endTime: "16:00",
};

const DEFAULT_BOOK: StudentSchema["books"][number] = {
  title: "Tour of Python",
  link: "/tourOfPython",
  imagekey: "python-logo-only.png",
  state: "기초",
  description:
    "기본적인 파이썬 문법을 둘러보면서 파이썬 코드를 이해할 수 있는 수준으로 성장하는 것을 목표로 합니다.",
};

const INITIAL_DEFAULTS: StudentSchema = {
  name: "",
  studentPhoneNumber: "",
  birthday: new Date(Date.now()),
  role: "student",
  class: [{ ...DEFAULT_CLASS, startTime: "18:00", endTime: "20:00" }],
  books: [DEFAULT_BOOK],
};

export default function SignUpForm({
  studentData,
}: {
  studentData?: { _id: string } & StudentSchema;
}) {
  const form = useForm<StudentSchema>({
    resolver: zodResolver(studentSchema),
    mode: "onSubmit",
    defaultValues: studentData ?? INITIAL_DEFAULTS,
  });

  const {
    fields: bookFields,
    append: appendBook,
    remove: removeBook,
  } = useFieldArray({ control: form.control, name: "books" });

  const {
    fields: classFields,
    append: appendClass,
    remove: removeClass,
  } = useFieldArray({ control: form.control, name: "class" });

  async function onSubmit(data: StudentSchema) {
    data.books = data.books.map((v) => {
      const match = Booklist[v.title as keyof typeof Booklist];
      return match ?? v;
    });
    data.studentPhoneNumber = data.studentPhoneNumber.replace(/-/g, "");

    const result = await (studentData
      ? updateStudentAction({ ...data, _id: studentData._id })
      : studentCreateAction(data));

    if (result.success) {
      toast.success(studentData ? "수정되었습니다." : "회원가입이 완료되었습니다.", {
        position: "top-center",
      });
      if (studentData) {
        redirect(".");
      } else {
        form.reset();
      }
    } else {
      toast.error(
        studentData
          ? "다시 확인하세요."
          : "회원가입에 실패하였습니다. 입력값을 확인해주세요.",
        { position: "top-center" },
      );
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{studentData ? "정보 수정" : "회원등록"}</CardTitle>
        <CardDescription>
          {studentData
            ? "정보수정하기"
            : "아래의 양식을 작성하여 회원등록을 완료하세요."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-signup" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="grid w-full items-center gap-2 sm:grid-cols-3">
              <FormInput
                label="이름"
                name="name"
                id="form-name"
                control={form.control}
                placeholder="김경섭"
              />
              <FormInput
                label="전화번호"
                transform={formatPhoneNumber}
                name="studentPhoneNumber"
                id="form-phoneNumber"
                control={form.control}
                placeholder="010-0000-0000"
              />
              <BirthdayField control={form.control} watch={form.watch} />
            </div>

            {classFields.map((field, index) => (
              <ClassRow
                key={field.id}
                index={index}
                control={form.control}
                onRemove={() => removeClass(index)}
                canRemove={classFields.length > 1}
              />
            ))}
            <div className="flex w-full gap-2">
              <Button
                variant="default"
                type="button"
                onClick={() => appendClass(DEFAULT_CLASS)}
              >
                추가
                <PlusIcon />
              </Button>
            </div>

            {bookFields.map((book, index) => (
              <BookRow
                key={book.id}
                index={index}
                control={form.control}
                onRemove={() => removeBook(index)}
                canRemove={bookFields.length > 1}
              />
            ))}
            <div className="flex w-full gap-2">
              <Button
                variant="default"
                type="button"
                onClick={() => appendBook(DEFAULT_BOOK)}
              >
                추가
                <PlusIcon />
              </Button>
            </div>

            <Controller
              name="role"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="form-role">권한</FieldLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="권한 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">학생</SelectItem>
                      <SelectItem value="admin">관리자</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          {!studentData && (
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              초기화
            </Button>
          )}
          <Button type="submit" form="form-signup">
            {studentData ? "수정" : "등록"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}

function BirthdayField({
  control,
  watch,
}: {
  control: Control<StudentSchema>;
  watch: UseFormWatch<StudentSchema>;
}) {
  const birthday = watch("birthday");
  return (
    <Controller
      name="birthday"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="h-20">
          <FieldLabel htmlFor="form-birthday">생년월일</FieldLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button id="form-birthday" variant="outline">
                {birthday
                  ? format(birthday, "yyyy/MM/dd", { locale: ko })
                  : "생년월일 선택"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={birthday ? new Date(birthday) : undefined}
                onSelect={field.onChange}
                defaultMonth={new Date(Date.now())}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
        </Field>
      )}
    />
  );
}

function ClassRow({
  index,
  control,
  onRemove,
  canRemove,
}: {
  index: number;
  control: Control<StudentSchema>;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const showLabel = index === 0;
  return (
    <div className="grid w-full items-center gap-2 sm:grid-cols-5">
      <Controller
        name={`class.${index}.title`}
        control={control}
        render={({ field: f, fieldState: s }) => (
          <Field data-invalid={s.invalid}>
            {showLabel && (
              <FieldLabel htmlFor={`class.${index}.title`}>수업반</FieldLabel>
            )}
            <Select onValueChange={f.onChange} defaultValue={f.value}>
              <SelectTrigger>
                <SelectValue placeholder="수업반 선택" />
              </SelectTrigger>
              <SelectContent>
                {CLASS_TITLES.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />
      <Controller
        name={`class.${index}.day`}
        control={control}
        render={({ field: f, fieldState: s }) => (
          <Field data-invalid={s.invalid}>
            {showLabel && (
              <FieldLabel htmlFor={`class.${index}.day`}>등원 요일</FieldLabel>
            )}
            <Select onValueChange={f.onChange} defaultValue={f.value}>
              <SelectTrigger>
                <SelectValue placeholder="등원 요일 선택" />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />
      <Controller
        name={`class.${index}.startTime`}
        control={control}
        render={({ field: f, fieldState: s }) => (
          <Field data-invalid={s.invalid}>
            {showLabel && (
              <FieldLabel htmlFor={`class.${index}.startTime`}>
                등원 시간
              </FieldLabel>
            )}
            <Input
              {...f}
              id={`class.${index}.startTime`}
              aria-invalid={s.invalid}
              placeholder="13:00"
              autoComplete="off"
            />
            {s.invalid && <FieldError errors={[s.error]} />}
          </Field>
        )}
      />
      <Controller
        name={`class.${index}.endTime`}
        control={control}
        render={({ field: f, fieldState: s }) => (
          <Field data-invalid={s.invalid}>
            {showLabel && (
              <FieldLabel htmlFor={`class.${index}.endTime`}>
                하원 시간
              </FieldLabel>
            )}
            <Input
              {...f}
              id={`class.${index}.endTime`}
              aria-invalid={s.invalid}
              placeholder="15:00"
              autoComplete="off"
            />
            {s.invalid && <FieldError errors={[s.error]} />}
          </Field>
        )}
      />
      <Field>
        {showLabel && <FieldLabel>삭제</FieldLabel>}
        <div>
          <Button
            size="icon"
            variant="destructive"
            type="button"
            onClick={onRemove}
            disabled={!canRemove}
          >
            <Trash2Icon />
          </Button>
        </div>
      </Field>
    </div>
  );
}

function BookRow({
  index,
  control,
  onRemove,
  canRemove,
}: {
  index: number;
  control: Control<StudentSchema>;
  onRemove: () => void;
  canRemove: boolean;
}) {
  const showLabel = index === 0;
  return (
    <div className="flex gap-2 md:grid md:grid-cols-3">
      <Controller
        name={`books.${index}.title`}
        control={control}
        render={({ field: f, fieldState: s }) => (
          <Field data-invalid={s.invalid} className="col-span-2">
            {showLabel && (
              <FieldLabel htmlFor={`books.${index}.title`}>
                열람 가능 교재
              </FieldLabel>
            )}
            <Select onValueChange={f.onChange} defaultValue={f.value}>
              <SelectTrigger>
                <SelectValue placeholder="교재 선택" />
              </SelectTrigger>
              <SelectContent>
                {BOOK_TITLES.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        )}
      />
      <Field>
        {showLabel && <FieldLabel>삭제</FieldLabel>}
        <div>
          <Button
            size="icon"
            variant="destructive"
            type="button"
            onClick={onRemove}
            disabled={!canRemove}
          >
            <Trash2Icon />
          </Button>
        </div>
      </Field>
    </div>
  );
}

function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  id,
  placeholder,
  transform,
  ...props
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="h-20">
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <Input
            {...field}
            onChange={(e) => {
              field.onChange(transform ? transform(e.target.value) : e.target.value);
            }}
            {...props}
            id={id}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            autoComplete="off"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
