export const getRandomAlphanumeric = (desiredLength: number): string => [...Array(desiredLength)]
        .map(() => (~~(Math.random() * 36)).toString(36))
        .join(""); 
