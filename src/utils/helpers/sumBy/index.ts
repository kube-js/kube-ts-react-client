const sumBy = (field: string) => (items: any[]) => items.reduce((acc: number, next: any) => acc + next[field], 0);

export default sumBy;