import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formatLocalDateToDateString = (localDate: string) => {
    const date = new Date(localDate);
    return date.toLocaleDateString(
        'fr-FR',
        {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }
    );

}
export const formatLocalDateToTimeString = (localDate: string) => {
    const date = new Date(localDate);
    return date.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
}
