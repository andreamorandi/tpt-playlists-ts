import { FC } from "react";
import classNames from "classnames";

interface SkeletonProps {
    times: number;
    className?: string;
};

const Skeleton: FC<SkeletonProps> = ({ times, className }) => {
    const outerClassNames: string = classNames(
        'relative',
        'overflow-hidden',
        'bg-gray-800',
        'rounded',
        'mb-2.5',
        className
    );
    const innerClassNames: string = classNames(
        'animate-shimmer',
        'absolute',
        'inset-0',
        '-translate-x-full',
        'bg-gradient-to-r',
        'from-gray-800',
        'via-black',
        'to-gray-800'
    );

    const boxes: JSX.Element[] = Array(times).fill(0).map((_, i) => {
        return <div key={i} data-testid="skeleton" className={outerClassNames}>
            <div className={innerClassNames}></div>
        </div>;
    });

    return <>{boxes}</>;
};

export default Skeleton;