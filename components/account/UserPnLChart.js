import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { DefaultTooltipContent } from "recharts/lib/component/DefaultTooltipContent";

import {
  toK,
  toNiceDate,
  toNiceDateYear,
  getSmallNumber,
} from "../../utils/helper";
import CustomResponsiveChart from "../common/CustomResponsiveChart";

function UserPnLChart(props) {
  let transactions = []
    .concat(props.data.transactions.slice(0, props.range))
    .reverse();

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
          labelFormatter={(label) => toNiceDateYear(label)}
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

        <Bar dataKey="totalPnlAmount" stackId="a" fill="#059669">
          {transactions.map((tx, index) => {
            const isNegative = tx.totalPnlAmount < 0;
            return (
              <Cell
                key={`cell-${index}`}
                fill={isNegative ? "#F87171" : "#059669"}
              />
            );
          })}
        </Bar>
      </BarChart>
    </CustomResponsiveChart>
  );
}

function CustomTooltip(props) {
  if (props.payload?.[0] != null) {
    let isLoss = props.payload[0].payload.totalPnlAmount < 0;
    const newPayload = [
      {
        name: isLoss ? `😢😢 Loss` : `🎉🎉 Profit`,
        value: toK(getSmallNumber(props.payload[0].payload.totalPnlAmount)),
        color: isLoss ? "red" : "green",
      },
    ];

    return <DefaultTooltipContent {...props} payload={newPayload} />;
  }
  return <DefaultTooltipContent {...props} />;
}

export default UserPnLChart;
