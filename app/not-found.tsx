import { FrownIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-rose-400 select-none leading-none">
          404
        </h1>

        <div className="mt-4 mb-6 flex justify-center">
          <FrownIcon size={50} color="#2773ec" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          페이지를 찾을 수 없어요
        </h2>
        <div className="text-gray-500 mb-8 leading-relaxed">
          <div>요청하신 페이지가 삭제되었거나,</div>
          <div>주소가 변경되었을 수 있어요.</div>
        </div>

        {/* 버튼 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
