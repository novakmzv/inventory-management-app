export class DateUtils {

  static formatToInputDate(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  static formatToDisplayDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  static isToday(date: string | Date): boolean {
    const today = new Date();
    const compareDate = new Date(date);

    return today.toDateString() === compareDate.toDateString();
  }

  static isWithinDays(date: string | Date, days: number): boolean {
    const today = new Date();
    const compareDate = new Date(date);
    const diffTime = Math.abs(today.getTime() - compareDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays <= days;
  }
}
