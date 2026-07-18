import { useEffect, useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { trpc } from '@/lib/trpc';

interface ClickStats {
  [key: string]: number;
}

interface ConversionStats {
  total: number;
  byPartner: ClickStats;
  byCategory: ClickStats;
  byStatus: ClickStats;
  totalValue: number;
}

interface ConversionRate {
  clicks: number;
  conversions: number;
  conversionRate: string;
}

interface TopSource {
  source: string;
  count: number;
}

export function AffiliateAnalytics() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(true);
  const [clicksByPartner, setClicksByPartner] = useState<ClickStats>({});
  const [clicksByCategory, setClicksByCategory] = useState<ClickStats>({});
  const [clicksBySource, setClicksBySource] = useState<ClickStats>({});
  const [conversionStats, setConversionStats] = useState<ConversionStats | null>(null);
  const [conversionRate, setConversionRate] = useState<ConversionRate | null>(null);
  const [topSources, setTopSources] = useState<TopSource[]>([]);
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  // Redirect non-admin users
  useEffect(() => {
    if (user && user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  // Fetch analytics data using tRPC
  const clicksByPartnerQuery = trpc.analytics.getClicksByPartner.useQuery(
    { startDate: undefined, endDate: undefined },
    { enabled: user?.role === 'admin' }
  );
  const clicksByCategoryQuery = trpc.analytics.getClicksByCategory.useQuery(
    { startDate: undefined, endDate: undefined },
    { enabled: user?.role === 'admin' }
  );
  const clicksBySourceQuery = trpc.analytics.getClicksBySource.useQuery(
    { startDate: undefined, endDate: undefined },
    { enabled: user?.role === 'admin' }
  );
  const conversionStatsQuery = trpc.analytics.getConversionStats.useQuery(
    { startDate: undefined, endDate: undefined },
    { enabled: user?.role === 'admin' }
  );
  const conversionRateQuery = trpc.analytics.getConversionRate.useQuery(
    { startDate: undefined, endDate: undefined },
    { enabled: user?.role === 'admin' }
  );
  const topSourcesQuery = trpc.analytics.getTopSources.useQuery(
    { limit: 10, startDate: undefined, endDate: undefined },
    { enabled: user?.role === 'admin' }
  );

  // Update state when queries complete
  useEffect(() => {
    if (clicksByPartnerQuery.data) {
      setClicksByPartner(clicksByPartnerQuery.data);
    }
    if (clicksByCategoryQuery.data) {
      setClicksByCategory(clicksByCategoryQuery.data);
    }
    if (clicksBySourceQuery.data) {
      setClicksBySource(clicksBySourceQuery.data);
    }
    if (conversionStatsQuery.data) {
      setConversionStats(conversionStatsQuery.data);
    }
    if (conversionRateQuery.data) {
      setConversionRate(conversionRateQuery.data);
    }
    if (topSourcesQuery.data) {
      setTopSources(topSourcesQuery.data);
    }

    const isLoading =
      clicksByPartnerQuery.isLoading ||
      clicksByCategoryQuery.isLoading ||
      clicksBySourceQuery.isLoading ||
      conversionStatsQuery.isLoading ||
      conversionRateQuery.isLoading ||
      topSourcesQuery.isLoading;

    setLoading(isLoading);
  }, [
    clicksByPartnerQuery.data,
    clicksByCategoryQuery.data,
    clicksBySourceQuery.data,
    conversionStatsQuery.data,
    conversionRateQuery.data,
    topSourcesQuery.data,
    clicksByPartnerQuery.isLoading,
    clicksByCategoryQuery.isLoading,
    clicksBySourceQuery.isLoading,
    conversionStatsQuery.isLoading,
    conversionRateQuery.isLoading,
    topSourcesQuery.isLoading,
  ]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const partnerChartData = Object.entries(clicksByPartner).map(([name, value]) => ({
    name,
    clicks: value,
  }));

  const categoryChartData = Object.entries(clicksByCategory).map(([name, value]) => ({
    name,
    clicks: value,
  }));

  const COLORS = ['#0077B6', '#F4A261', '#E76F51', '#2A9D8F'];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Affiliate Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track clicks and conversions from all affiliate partners</p>
        </div>

        {/* Date Range Selector */}
        <div className="flex gap-2 mb-8">
          {(['7d', '30d', '90d', 'all'] as const).map((range) => (
            <Button
              key={range}
              variant={dateRange === range ? 'default' : 'outline'}
              onClick={() => setDateRange(range)}
              className="capitalize"
            >
              {range === 'all' ? 'All Time' : `Last ${range.slice(0, -1)} days`}
            </Button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Clicks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{conversionRate?.clicks.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Conversions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{conversionRate?.conversions}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{conversionRate?.conversionRate}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Est. Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">${conversionStats?.totalValue.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Clicks by Partner */}
          <Card>
            <CardHeader>
              <CardTitle>Clicks by Partner</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={partnerChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="clicks" fill="#0077B6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Clicks by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Clicks by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="clicks"
                  >
                    {categoryChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Top Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{source.source}</p>
                    <div className="w-full bg-secondary h-2 rounded-full mt-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${(source.count / (topSources[0]?.count || 1)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="font-bold text-foreground">{source.count.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      {((source.count / (conversionRate?.clicks || 1)) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Conversion Status */}
        {conversionStats && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Conversion Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(conversionStats.byStatus).map(([status, count]) => (
                  <div key={status} className="bg-secondary p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground capitalize mb-1">{status}</p>
                    <p className="text-2xl font-bold text-foreground">{count}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {((count / conversionStats.total) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
