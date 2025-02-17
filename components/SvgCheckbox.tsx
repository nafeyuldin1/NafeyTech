import React from 'react';

const SvgCheckbox: React.FC = () => {
  return (
    <div>
      {/* Checkbox Input */}
      <input type="checkbox" />

      {/* SVG Section */}
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} id="wrap">
          {Array.from({ length: 3 }).map((_, svgIndex) => (
            <svg
              key={svgIndex}
              id="Layer_1"
              viewBox="0 0 820 864"
              x="0px"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              y="0px"
              enableBackground="new 0 0 820 864"  // Set enable-background directly as an SVG attribute
            >
              <g>
                <g id="Layer_1-2">
                  <path
                    className="st0"
                    d="M341.8,326.1h213c89.9-9.3,148.7-84.1,140-152c-7.6-58.9-67.1-121.3-133-109c-65.2,12.2-103.6,91.5-87,133
                        c15.6,39.1,72.5,25.7,104,73c34.8,52.2,4.4,126.9,1,135c-38.6,91.3-166.6,159.9-283,120c-83.1-28.5-148.1-108-153-203
                        c-5.2-102,61.1-181.2,130-217c105.2-54.7,222.8-11.2,288,42c134.2,109.5,141.4,337.4,56,424c-58.7,59.5-164.8,55.8-217,147
                        c-6.4,11.2-13.2,25.9-9,41c12.1,43.6,109.8,70.9,180,42c82.7-34.1,134.7-149.4,97-207c-35.2-53.7-145.1-52.1-210-14
                        c-39,22.9-40.8,46.7-85,69c-55.6,28.1-132.6,30.5-146,7c-14.9-26.2,38-103.1,320-320"
                  />
                </g>
              </g>
            </svg>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SvgCheckbox;
