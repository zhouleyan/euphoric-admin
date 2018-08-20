import React, { PureComponent } from 'react';

/**
 * 基本图形
 * <rect>             x, y, width, height, rx, ry
 * <circle>           cx, cy, r
 * <ellipse>          cx, cy, rx, ry
 * <line>             x1, x2, y1, y2
 * <polyline>         points: (x1, y1) + ...
 * <polygon>          points: (x1, y1) + ...
 *
 * 基本属性
 * fill:             填充颜色
 * stroke:           边线颜色
 * stroke-width:     边线宽度
 * transform:        变形
 */

class SVG extends PureComponent {
  render() {
    return (
      <div>
        <svg xmlns="http://www.w3.org/2000/svg">
          <rect
            x="10"
            y="10"
            rx="5"
            ry="5"
            width="150"
            height="100"
            stroke="red"
            strokeWidth="2"
            fill="blue"
            // fill="none"
          />
          <circle cx="250" cy="60" r="50" stroke="red" fill="none" />
          <ellipse cx="400" cy="60" rx="70" ry="50" stroke="red" fill="none" />
        </svg>
      </div>
    );
  }
}

export default SVG;
