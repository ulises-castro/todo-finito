export const getRandomAlphanumeric = (desiredLength: Number): String => [...Array(desiredLength)]
        .map(() => (~~(Math.random() * 36)).toString(36))
        .join(""); 
