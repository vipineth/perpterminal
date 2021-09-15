import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Line,
  LineChart,
} from "recharts";
import { DefaultTooltipContent } from "recharts/lib/component/DefaultTooltipContent";

import {
  toK,
  toNiceDate,
  toNiceDateYear,
  getSmallNumber,
} from "../../utils/helper";
import CustomResponsiveChart from "../common/CustomResponsiveChart";

function StakingChart(props) {
  let transactions = []
    .concat(props.data.stakingDayDatas)
    .reverse()
    .slice(-props.range);

  return (
    <CustomResponsiveChart>
      <BarChart data={transactions} margin={{ bottom: 20, top: 10 }}>
        <XAxis
          dataKey="date"
          tickFormatter={(d) => toNiceDate(d)}
          tick={{ fontSize: 12, color: "red" }}
          style={{
            fontSize: "0.85rem",
          }}
        />
        <YAxis
          fontSize={14}
          width={40}
          tickFormatter={(d) => toK(getSmallNumber(d))}
          padding={{ top: 20 }}
        />
        <Tooltip
          content={<CustomTooltip />}
          labelFormatter={(label) => <Badge label={toNiceDateYear(label)} />}
          cursor={true}
          labelStyle={{ paddingTop: 4 }}
          contentStyle={{
            padding: "10px 14px",
            borderRadius: 10,
            borderColor: "black",
            fontSize: "1.25rem",
          }}
          wrapperStyle={{ top: -70, left: -10 }}
        />

        <Bar dataKey="totalStaked" stackId="a" fill="#059669"></Bar>
        <Bar dataKey="totalUnstaked" stackId="a" fill="#B91C1C"></Bar>
        <Bar dataKey="totalWithdrawn" stackId="a" fill="#FBBF24"></Bar>
      </BarChart>
    </CustomResponsiveChart>
  );
}

function CustomTooltip(props) {
  if (props.payload?.[0] != null) {
    let isLoss = props.payload[0].payload.totalStaked < 0;
    const newPayload = [
      {
        name: "Total PERP Staked",
        value: toK(getSmallNumber(props.payload[0].payload.totalStaked)),
        color: "#059669",
      },
      {
        name: "Total PERP Unstaked",
        value: toK(getSmallNumber(props.payload[0].payload.totalUnstaked)),
        color: "#B91C1C",
      },
      {
        name: "Total PERP Withdrawn",
        value: toK(getSmallNumber(props.payload[0].payload.totalWithdrawn)),
        color: "#FBBF24",
      },
    ];

    return <DefaultTooltipContent {...props} payload={newPayload} />;
  }
  return <DefaultTooltipContent {...props} />;
}

export default StakingChart;

function Badge(props) {
  return (
    <span className="inline-flex items-center px-3 py-1.5 rounded font-medium bg-gray-800 text-white mb-4 uppercase text-xs">
      <svg
        className="-ml-1 mr-1.5 h-2 w-2 text-white"
        fill="currentColor"
        viewBox="0 0 8 8"
      >
        <circle cx={4} cy={4} r={3} />
      </svg>
      {props.label}
    </span>
  );
}
