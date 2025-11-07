import { inputtv } from "@/app/lib/tv/forms/FormStyles";
import { StudentDataRegister } from "@/types";
import { forwardRef } from "react";

const StudentFormName = forwardRef<HTMLInputElement, StudentDataRegister>((props, ref) => {
	return (
		<div>
			<input  placeholder="이름을 입력하세요"  className={inputtv({size: "l", insert: true})} {...props} ref={ref}  />
		</div>
	)
})
export default StudentFormName;
