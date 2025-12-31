"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, MousePointer2, BarChart3, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { Skeleton } from "~/components/ui/skeleton";

/**
 * analytics view component with charts and metrics
 */
export function AnalyticsView() {
  const { data: summary, isLoading } = api.analytics.getSummary.useQuery();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
              total clicks
            </CardTitle>
            <MousePointer2 size={16} className="text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{summary.totalClicks}</div>
            <p className="text-muted-foreground mt-1 text-xs">
              all time performance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
              top link
            </CardTitle>
            <BarChart3 size={16} className="text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="truncate text-2xl font-bold">
              {summary.clicksPerLink[0]?.title ?? "N/A"}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              {summary.clicksPerLink[0]?.clicks ?? 0} clicks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
              period
            </CardTitle>
            <Calendar size={16} className="text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">last 7 days</div>
            <p className="text-muted-foreground mt-1 text-xs">
              active tracking period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Clicks Trend Chart */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            click trends
          </CardTitle>
          <CardDescription>
            visualizing your link performance over the past week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-4 h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={summary.clicksOverTime}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val: string) =>
                    new Date(val).toLocaleDateString("en-US", {
                      weekday: "short",
                    })
                  }
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#4A6741" // matching sage green primary theme
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#4A6741", strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Clicks Per Link Chart */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>performance by link</CardTitle>
            <CardDescription>
              ranking of your links by click count
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mt-2 h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={summary.clicksPerLink} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="title"
                    type="category"
                    width={100}
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip cursor={{ fill: "transparent" }} />
                  <Bar
                    dataKey="clicks"
                    fill="#D17A5D" // terracotta accent
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/5 flex flex-col items-center justify-center border-2 border-dashed p-6 text-center">
          <div className="bg-primary/10 text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <BarChart3 size={32} />
          </div>
          <h3 className="text-lg font-bold">insights coming soon</h3>
          <p className="text-muted-foreground mt-2 max-w-[250px] text-sm">
            we are building deeper insights like regional tracking and browser
            analytics.
          </p>
        </Card>
      </div>
    </div>
  );
}
