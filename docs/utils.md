import clsx from "clsx";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import styles from "./utils.css";

export const Merged = ({ date }) => (
  <div>
  <div className="merged">
    <span>
      <svg
        height="16"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        fill="white"
        aria-hidden="true"
        className="status_svg"
      >
        <path
          fillRule="evenodd"
          d="M5 3.254V3.25v.005a.75.75 0 110-.005v.004zm.45 1.9a2.25 2.25 0 10-1.95.218v5.256a2.25 2.25 0 101.5 0V7.123A5.735 5.735 0 009.25 9h1.378a2.251 2.251 0 100-1.5H9.25a4.25 4.25 0 01-3.8-2.346zM12.75 9a.75.75 0 100-1.5.75.75 0 000 1.5zm-8.5 4.5a.75.75 0 100-1.5.75.75 0 000 1.5z"
        ></path>
      </svg>
      Merged
    </span>
  </div>
  {date || null}
  </div>
);

export const ImageWrapper = ({ src, alt, width }) => {
const [isOpen, setIsOpen] = React.useState(false);
return (
  <div>
    <div className="image-zoom" onClick={() => setIsOpen(true)}>
      <img src={src} alt={alt} width={width} />
    </div>
    {isOpen && (
      <Lightbox
        mainSrc={src}
        onCloseRequest={() => setIsOpen(false)}
      />
    )}
  </div>
);
}

export const Open = ({ date }) => (
<div>
  <div className="open">
    <span>
      <svg
        height="16"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        fill="white"
        aria-hidden="true"
        className="status_svg"
      >
        <path
          fillRule="evenodd"
          d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"
        ></path>
      </svg>
      Open
    </span>
  </div>
  {date || null}
</div>
);

export const Status = ({ url }) => {
  const [merged, setMerged] = React.useState(null);
  React.useEffect(() => {
    let isMounted = true;
    fetch(url).then(res => res.json()).then(res => {
      if (isMounted) {
      setMerged(res.merged)
      }
    })
    return () => { isMounted = false };
  }, [])
  return merged === null ? <div /> : merged === true ? <Merged /> : <Open />
}
