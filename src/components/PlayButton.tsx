import { FC, useState } from "react";
import "../styles/PlayButton.scss";

interface PlayButtonProps {
    container: string;
};

const PlayButton: FC<PlayButtonProps> = (props) => {
    const [isActive, setIsActive] = useState<boolean>(false);

    const toggleActive = (): void => {
        setIsActive(!isActive);
    };

    return (
        <div className={`button ${isActive ? 'active' : ''} ${props.container}`}>
            <div className="background"></div>
            <div className="icon">
                <div className="left part"></div>
                <div className="right part"></div>
            </div>
            <div className="pointer" onClick={toggleActive}></div>
        </div>
    );
};

export default PlayButton;
