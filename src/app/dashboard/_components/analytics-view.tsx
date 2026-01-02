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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, MousePointer2, Monitor, Smartphone } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(221, 83%, 53%)",
  "hsl(262, 83%, 58%)",
  "hsl(291, 64%, 42%)",
  "hsl(24, 90%, 50%)",
];

/**
 * analytics view component with charts and metrics
 */
export function AnalyticsView() {
  const { data: summary, isLoading: summaryLoading } =
    api.analytics.getSummary.useQuery();
  const { data: deviceStats, isLoading: deviceLoading } =
    api.analytics.getDeviceStats.useQuery();
  const { isLoading: browserLoading } =
    api.analytics.getBrowserStats.useQuery();
  const { data: todayClicks, isLoading: todayLoading } =
    api.analytics.getTodayClicks.useQuery();

  if (summaryLoading || deviceLoading || browserLoading || todayLoading) {
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

  // checking if user needs to upgrade for full analytics
  if (summary.requiresUpgrade) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-primary/10 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <Lock className="text-primary" size={40} />
        </div>
        <h2 className="mb-2 text-2xl font-bold">Unlock Full Analytics</h2>
        <p className="text-muted-foreground mb-2 max-w-md">
          You&apos;ve had{" "}
          <span className="text-primary font-bold">{summary.totalClicks}</span>{" "}
          total clicks! Upgrade to Pro to see detailed analytics including:
        </p>
        <ul className="text-muted-foreground mb-6 space-y-1 text-sm">
          <li>✓ Click trends over time</li>
          <li>✓ Performance by link</li>
          <li>✓ Device & browser breakdown</li>
          <li>✓ Referrer tracking</li>
        </ul>
        <Link href="/pricing">
          <Button className="h-12 rounded-full px-8 text-base font-semibold">
            <Sparkles className="mr-2" size={18} />
            Upgrade to Pro
          </Button>
        </Link>
      </div>
    );
  }

  // formatting device data for pie charts
  const formattedDeviceData = (deviceStats ?? []).map((item) => ({
    name: item.device ?? "Unknown",
    value: item.clicks,
  }));

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
              today&apos;s clicks
            </CardTitle>
            <TrendingUp size={16} className="text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{todayClicks ?? 0}</div>
            <p className="text-muted-foreground mt-1 text-xs">
              in the last 24 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium tracking-wider uppercase">
              active links
            </CardTitle>
            <Smartphone size={16} className="text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {summary.clicksPerLink.length}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">
              links being tracked
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
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Clicks Per Link Chart & Device/Browser Stats */}
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
                    fill="hsl(var(--primary))"
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Monitor className="text-primary" size={20} />
              <CardTitle>device & browser stats</CardTitle>
            </div>
            <CardDescription>visitor breakdown by device type</CardDescription>
          </CardHeader>
          <CardContent>
            {formattedDeviceData.length > 0 ? (
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={formattedDeviceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {formattedDeviceData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-muted-foreground flex h-[250px] items-center justify-center text-sm">
                No device data available yet. Start sharing your links!
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
