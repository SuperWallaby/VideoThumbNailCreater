import React from "react";
import { Range, getTrackBackground } from "react-range";

interface IProp {
    setValue: (num: number) => void;
    value: number;
    step: number;
    MIN: number;
    MAX: number;
}

export const RangeSlider: React.FC<IProp> = ({
    MAX,
    MIN,
    step,
    value,
    setValue,
}) => {
    return (
        <div
            className="rangeSlider"
            style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
            }}
        >
            <Range
                values={[value]}
                step={step}
                min={MIN}
                max={MAX}
                onChange={(values) => {
                    setValue(values[0]);
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
                                    values: [value],
                                    colors: ["#548BF4", "#ccc"],
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
                        className={`rangeSlider__thumb`}
                        {...props}
                        style={{
                            ...props.style,
                        }}
                    >
                        <div
                            className={`rangeSlider__thumbIn`}
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
