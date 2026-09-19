import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ArticleBreadcrumbsProps {
  currentLabel: string;
}

/** Visible navigation that mirrors the server-rendered Home › Blog › article hierarchy. */
export default function ArticleBreadcrumbs({ currentLabel }: ArticleBreadcrumbsProps) {
  return (
    <Breadcrumb className="mb-4" aria-label="Article location">
      <BreadcrumbList className="text-sm text-slate-600">
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-[#0077B6] hover:text-[#005c91]">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-slate-400" />
        <BreadcrumbItem>
          <BreadcrumbLink href="/blog" className="text-[#0077B6] hover:text-[#005c91]">
            Blog
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-slate-400" />
        <BreadcrumbItem className="min-w-0">
          <BreadcrumbPage className="max-w-[15rem] truncate text-slate-700 sm:max-w-[23rem]">
            {currentLabel}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
