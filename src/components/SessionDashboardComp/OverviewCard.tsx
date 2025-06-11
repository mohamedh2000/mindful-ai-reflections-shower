import { Card, CardContent } from '@/components/ui/card';
const OverviewCard = ({icon, metric, value}) => {
    return (
        <Card className="bg-therapy-gradient-soft border-none">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2">
            {icon}
            <div>
              <p className="text-xs text-muted-foreground">{metric}</p>
              <p className="text-lg font-semibold text-foreground">{value}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
}

export default OverviewCard;