import BookIntro from "./component/BookIntro";
import BooksGrid from "./component/Books";
import Goal from "./component/BooksGoal";

export default async function Page() {
	return (
		<div className={`space-y-3 text-lg `}>
			<BookIntro />
			<Goal />
			<BooksGrid />
		</div>
	)
}
