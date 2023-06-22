const mapping: Record<string, string> = {
  attendances: 'attendance',
  clubs: 'club',
  meets: 'meet',
  results: 'result',
  swimmers: 'swimmer',
  teams: 'team',
  'training-plans': 'training_plan',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
