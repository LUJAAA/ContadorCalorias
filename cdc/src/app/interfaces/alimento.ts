export interface Alimentos {
    category: string;
    categoryLabel: string;
    foodId: string;
    image: string;
    label: string;
    nutrients: nut[];

}

export interface nut{
    CHOCDF: string;
    ENERC_KCAL: string;
}
