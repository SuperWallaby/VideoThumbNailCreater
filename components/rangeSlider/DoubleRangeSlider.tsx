import React from "react";
import { Range, getTrackBackground } from "react-range";

interface IProp {
    setValue: (nums: number[]) => void;
    values: number[];
    onMouseUp?: () => void;
    step: number;
    MIN: number;
    MAX: number;
}

export const DoubleRangeSlider: React.FC<IProp> = ({
    MAX,
    MIN,
    onMouseUp,
    step,
    values,
    setValue,
}) => {
    return (
        <div
            className="dobuleRangeSlider"
            style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                margin: "1em",
            }}
        >
            <Range
                values={values}
                step={step}
                min={MIN}
                max={MAX}
                onChange={(values) => {
                    setValue(values);
                }}
                renderTrack={({ props, children }) => (
                    <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                            ...props.style,
                            height: "36px",
                            display: "flex",
                            width: "100%",
                        }}
                    >
                        <div
                            ref={props.ref}
                            style={{
                                height: "5px",
                                width: "100%",
                                borderRadius: "4px",
                                background: getTrackBackground({
                                    values,
                                    colors: ["#ccc", "#548BF4", "#ccc"],
                                    min: MIN,
                                    max: MAX,
                                }),
                                alignSelf: "center",
                            }}
                        >
                            {children}
                        </div>
                    </div>
                )}
                renderThumb={({ props, isDragged }) => (
                    <div
                        {...props}
                        onMouseUp={() => {
                            onMouseUp?.();
                        }}
                        className={`dobuleRangeSlider__thumb`}
                        style={{
                            ...props.style,
                        }}
                    >
                        <div
                            className={`dobuleRangeSlider__thumbIn`}
                            style={{
                                backgroundColor: isDragged ? "#548BF4" : "#CCC",
                            }}
                        />
                    </div>
                )}
            />
        </div>
    );
};
