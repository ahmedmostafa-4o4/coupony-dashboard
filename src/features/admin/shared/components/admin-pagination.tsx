import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminPaginationProps {
  currentPage: number;
  lastPage: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export function AdminPagination({
  currentPage,
  lastPage,
  perPage,
  onPageChange,
  onPerPageChange,
}: AdminPaginationProps) {
  // If there's no data or lastPage is 0, we can still show the per_page selector
  // but disable pagination controls.
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= lastPage || lastPage === 0;

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row py-4">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <span className="hidden sm:inline">Rows per page:</span>
        <Select
          value={String(perPage)}
          onValueChange={(val) => {
            onPerPageChange(Number(val));
          }}
        >
          <SelectTrigger className="h-9 w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15</SelectItem>
            <SelectItem value="30">30</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-600 mr-2">
          Page {lastPage > 0 ? currentPage : 0} of {lastPage}
        </span>
        <Button
          variant="secondary"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className="h-9 w-9 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>
        <Button
          variant="secondary"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLastPage}
          className="h-9 w-9 p-0"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
    </div>
  );
}
