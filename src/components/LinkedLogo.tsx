import {type ReactElement} from "react";

interface LinkedLogoProps {
    linkUrl: string;
    imageSrc: string;
    imageAlt: string;
}

export function LinkedLogo(
    {linkUrl, imageSrc, imageAlt = ""}: LinkedLogoProps
): ReactElement {
    return (
        <a href={linkUrl} target="_blank">
            <img src={imageSrc} className="logo" alt={imageAlt}/>
        </a>
    );
}
