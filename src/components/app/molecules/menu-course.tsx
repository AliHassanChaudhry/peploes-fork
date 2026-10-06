import { MenuDish } from "@/components/app/molecules/menu-dish";
import { ebGaramond } from "@/lib/fonts";
import type { IMenuCourseProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export function MenuCourse({
  course,
  idPrefix = "course",
  compact = false,
}: IMenuCourseProps) {
  if (!course.dishes.length) return null;

  const splitAt =
    course.columns === 1
      ? course.dishes.length
      : (course.firstColumnCount ??
        Math.ceil(course.dishes.length / course.columns));
  const remainingDishes = course.dishes.slice(splitAt);
  const remainingColumnSize = Math.ceil(
    remainingDishes.length / Math.max(1, course.columns - 1),
  );
  const columns = [
    course.dishes.slice(0, splitAt),
    ...Array.from({ length: course.columns - 1 }, (_, index) =>
      remainingDishes.slice(
        index * remainingColumnSize,
        (index + 1) * remainingColumnSize,
      ),
    ),
  ];
  const headingId = `${idPrefix}-${course._key}`;

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        "grid gap-5 border-t border-soft-stone py-8 xl:grid-cols-[346fr_950fr] xl:gap-0 xl:py-9",
        compact &&
          "xl:grid-cols-[310fr_986fr] xl:py-4 [&_h3]:xl:text-base [&_ul]:xl:space-y-3",
      )}
    >
      <h2
        id={headingId}
        className={cn(
          ebGaramond.className,
          "text-[38px] leading-[44px] tracking-[-0.4px] before:mb-2 before:block before:h-0.5 before:w-[42px] before:bg-peploe-burgundy xl:pr-9 xl:text-[42px] xl:leading-[50px] xl:before:w-11",
          compact && "xl:text-[34px] xl:leading-10 xl:before:w-9",
        )}
      >
        {course.heading}
      </h2>
      <div
        className={cn(
          "grid min-w-0 gap-4 xl:gap-0",
          course.columns === 2 && "xl:grid-cols-2",
          course.columns === 3 && "xl:grid-cols-3",
        )}
      >
        {columns
          .filter((dishes) => dishes.length > 0)
          .map((dishes) => (
            <ul
              key={dishes[0]._key}
              className="space-y-4 xl:border-l xl:border-soft-stone xl:pl-9 xl:not-last:pr-9"
            >
              {dishes.map((dish) => (
                <MenuDish key={dish._key} dish={dish} />
              ))}
            </ul>
          ))}
      </div>
    </section>
  );
}
