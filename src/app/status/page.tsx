"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Wifi, WifiOff, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface SystemStatus {
  api: "operational" | "degraded" | "outage";
  database: "operational" | "degraded" | "outage";
  storage: "operational" | "degraded" | "outage";
  lastUpdated: string;
}

interface Incident {
  id: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  impact: "none" | "minor" | "major" | "critical";
  description: string;
  startedAt: string;
  updatedAt: string;
}

/**
 * status page showing system health and incidents
 * @returns status page component
 */
export default function StatusPage() {
  const [status, setStatus] = useState<SystemStatus>({
    api: "operational",
    database: "operational",
    storage: "operational",
    lastUpdated: new Date().toISOString(),
  });

  const [incidents] = useState<Incident[]>([
    {
      id: "1",
      title: "Database connection timeout",
      status: "resolved",
      impact: "minor",
      description:
        "Some users experienced slow loading times due to database connection timeouts.",
      startedAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T11:15:00Z",
    },
    {
      id: "2",
      title: "API response delays",
      status: "monitoring",
      impact: "minor",
      description:
        "We are investigating reports of slower than usual API response times.",
      startedAt: "2024-01-14T14:20:00Z",
      updatedAt: "2024-01-14T15:45:00Z",
    },
  ]);

  const [isChecking, setIsChecking] = useState(false);

  const checkSystemStatus = async () => {
    setIsChecking(true);
    // Simulating API call to check system status
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulating random status updates
    const randomStatus = (): "operational" | "degraded" | "outage" => {
      const statuses: ("operational" | "degraded" | "outage")[] = [
        "operational",
        "degraded",
        "outage",
      ];
      const index = Math.floor(Math.random() * statuses.length);
      // using non-null assertion since we know index will be 0, 1, or 2
      return statuses[index] ?? "operational";
    };

    setStatus({
      api: randomStatus(),
      database: randomStatus(),
      storage: randomStatus(),
      lastUpdated: new Date().toISOString(),
    });
    setIsChecking(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600";
      case "degraded":
        return "text-yellow-600";
      case "outage":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5" />;
      case "degraded":
        return <Clock className="h-5 w-5" />;
      case "outage":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <WifiOff className="h-5 w-5" />;
    }
  };

  const getIncidentColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "text-green-600";
      case "monitoring":
        return "text-blue-600";
      case "identified":
        return "text-yellow-600";
      case "investigating":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const getIncidentIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-5 w-5" />;
      case "monitoring":
        return <Clock className="h-5 w-5" />;
      case "identified":
        return <AlertCircle className="h-5 w-5" />;
      case "investigating":
        return <WifiOff className="h-5 w-5" />;
      default:
        return <Wifi className="h-5 w-5" />;
    }
  };

  useEffect(() => {
    // Auto-refresh status every 5 minutes
    const interval = setInterval(() => {
      void checkSystemStatus();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
              <Wifi size={16} />
              System Status
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              System{" "}
              <span className="from-primary bg-gradient-to-r to-purple-600 bg-clip-text text-transparent">
                Status
              </span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              We monitor our systems 24/7 to ensure Linkbase is always available
              for you. Check the status below for any ongoing issues.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <Button
                onClick={checkSystemStatus}
                disabled={isChecking}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 font-bold"
              >
                {isChecking ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Checking...
                  </div>
                ) : (
                  "Refresh Status"
                )}
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-8 font-bold"
                asChild
              >
                <Link href="/help-center">Help Center</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* System Status */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  System Status
                </CardTitle>
                <CardDescription>
                  Current status of Linkbase systems and services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">API</h3>
                        <p className="text-muted-foreground text-sm">
                          Application Programming Interface
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-2 ${getStatusColor(
                          status.api,
                        )}`}
                      >
                        {getStatusIcon(status.api)}
                        <span className="capitalize">{status.api}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Database</h3>
                        <p className="text-muted-foreground text-sm">
                          Data storage and retrieval
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-2 ${getStatusColor(
                          status.database,
                        )}`}
                      >
                        {getStatusIcon(status.database)}
                        <span className="capitalize">{status.database}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Storage</h3>
                        <p className="text-muted-foreground text-sm">
                          File and media storage
                        </p>
                      </div>
                      <div
                        className={`flex items-center gap-2 ${getStatusColor(
                          status.storage,
                        )}`}
                      >
                        {getStatusIcon(status.storage)}
                        <span className="capitalize">{status.storage}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-muted-foreground text-sm">
                  Last updated: {new Date(status.lastUpdated).toLocaleString()}
                </div>
              </CardContent>
            </Card>

            {/* Recent Incidents */}
            <Card className="border-none shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Recent Incidents
                </CardTitle>
                <CardDescription>
                  Ongoing and recent system issues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {incidents.map((incident) => (
                  <div
                    key={incident.id}
                    className="hover:bg-muted/50 rounded-lg border p-4 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{incident.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {incident.description}
                        </p>
                        <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
                          <span>
                            Started:{" "}
                            {new Date(incident.startedAt).toLocaleString()}
                          </span>
                          <span>
                            Updated:{" "}
                            {new Date(incident.updatedAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`flex items-center gap-2 ${getIncidentColor(
                          incident.status,
                        )}`}
                      >
                        {getIncidentIcon(incident.status)}
                        <span className="font-medium capitalize">
                          {incident.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white/50 py-20 dark:bg-neutral-900/50">
        <div className="container mx-auto px-4">
          <div className="from-primary mx-auto max-w-4xl rounded-2xl bg-gradient-to-r to-purple-600 p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Need help?</h2>
            <p className="mb-8 text-lg text-white/90">
              If you&apos;re experiencing issues not listed above, please reach
              out to our support team.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="text-primary rounded-full bg-white px-8 font-bold hover:bg-white/90"
                asChild
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="rounded-full bg-white/20 px-8 font-bold text-white hover:bg-white/30"
                asChild
              >
                <Link href="/help-center">Visit Help Center</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
