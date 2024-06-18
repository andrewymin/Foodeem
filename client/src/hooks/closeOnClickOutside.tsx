import { useEffect } from "react";

const closeOnClickOutside = (
  ref: React.RefObject<HTMLUListElement>,
  handler: () => void
) => {
  useEffect(() => {
    const profileIcon = document.querySelector(".profile-icon");
    const listener = (e: MouseEvent | TouchEvent) => {
      // console.log(profileIcon?.classList[0]);
      const target = e.target as HTMLLIElement;
      // console.log(target.classList[0]);
      if (
        target.classList[0] == profileIcon?.classList[0] ||
        !ref.current ||
        ref.current.contains(e.target as Node)
      ) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default closeOnClickOutside;
