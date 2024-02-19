import {type ReactElement} from "react";

interface LinkedLogoProps {
    linkUrl: string;
    image: {
        src: string;
        alt: string;
    }
}

export function LinkedLogo(
    {linkUrl, image}: LinkedLogoProps
): ReactElement {
    return (
        <a href={linkUrl} target="_blank">
            {/*<img className="logo" {...image} />*/}
            <img src={image.src} alt={image.alt} className="logo"/>
        </a>
    );
}
