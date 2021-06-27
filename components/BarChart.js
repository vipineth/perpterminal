import dayjs from "dayjs";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { DefaultTooltipContent } from "recharts/lib/component/DefaultTooltipContent";

import {
  toK,
  toNiceDate,
  toNiceDateYear,
  getSmallNumber,
} from "../utils/helper";

const CustomBar = ({ x, y, width, height, fill }) => {
  return (
    <g>
      <rect x={x} y={y} fill={fill} width={width} height={height} rx="2" />
    </g>
  );
};

function Chart(props) {
  let dailyVolume = props.data?.slice(-props.range);

  if (!dailyVolume) {
    return <h2>Loading</h2>;
  }
  return (
    <ResponsiveContainer height="100%">
      <BarChart data={dailyVolume}>
        <XAxis
          dataKey="date"
          tickFormatter={(d) => toNiceDate(d)}
          tick={{ fontSize: 12, color: "red" }}
          style={{
            fontSize: "1rem",
          }}
        />

        <Tooltip
          content={<CustomTooltip />}
          cursor={true}
          formatter={(val) => toK(val, true)}
          labelFormatter={(label) => toNiceDateYear(label)}
          labelStyle={{ paddingTop: 4 }}
          contentStyle={{
            padding: "10px 14px",
            borderRadius: 10,
            borderColor: "black",
            fontSize: "1.25rem",
          }}
          wrapperStyle={{ top: -70, left: -10 }}
        />
        <Bar
          dataKey="volumeUSD"
          shape={(props) => {
            return (
              <CustomBar
                height={props.height}
                width={props.width}
                x={props.x}
                y={props.y}
                fill="#059669"
              />
            );
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip(props) {
  if (props.payload?.[0] != null) {
    const newPayload = [
      {
        name: "Volume",
        value: props.payload[0].payload.volumeUSD,
        color: "black",
      },
    ];
    return <DefaultTooltipContent {...props} payload={newPayload} />;
  }
  return <DefaultTooltipContent {...props} />;
}

export default Chart;
