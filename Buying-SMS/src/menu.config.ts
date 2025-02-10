export interface MenuItem {
    id: string;
    text: string;
    price?: number;
    subMenu?: MenuItem[];
}

export const mainMenu: MenuItem[] = [
    { id: '0', text: 'Sh 20=Kredo 110, 3hrs', price: 20 },
    {
        id: '1', text: 'Minutes', subMenu: [
            { id: '1-0', text: 'Sh 20 (Surprise Offers)', price: 20 },
            { id: '1-1', text: 'Sh 20 (30 Mins, 3hrs)', price: 20 },
            { id: '1-2', text: 'Sh 20 (15 Mins + 20 SMS)', price: 20 },
            { id: '1-3', text: 'Sh 30 (Kredo 90, Midnight)', price: 30 },
            { id: '1-4', text: 'Sh 20 (Kredo 50, Midnight)', price: 20 },
            { id: '1-5', text: 'Back' }
        ]
    },
    {
        id: '2', text: 'SMS Deals', subMenu: [
            { id: '2-0', text: 'Sh 10 (15 Mins, 1 hr)', price: 10 },
            { id: '2-1', text: 'Sh 20 (unlimited SMS daily)', price: 20 },
            { id: '2-2', text: 'Sh 30 (100 SMS, 24 hours)', price: 30 },
            { id: '2-3', text: 'Okoa SMS' },
            { id: '2-4', text: 'Unlimited SMS(Sh100)', price: 100 },
            { id: '2-5', text: 'Back' }
        ]
    },
    { id: '3', text: 'Balance' }
];
