//------- types
/* 
    input  - поле для ввода
    button - кнопка
*/

//------- values of types
/*
    number - числовое поле
    yes    - true
    no     - false
*/
const quests = [
    {
        id: 'personParameters',
        title: 'Ваш рост и вес',
        fields: [
            {
                type: 'input',
                value: 'number',
                placeholder: 'Рост'
            },
            {
                type: 'input',
                value: 'number',
                placeholder: 'Вес'
            },
        ]
    },
    {
        id: 'singleSleep',
        title: 'Вы будете спать один?',
        fields: [
            {
                type: 'button',
                value: false,
                placeholder: 'Нет'
            },
            {
                type: 'button',
                value: true,
                placeholder: 'Да'
            },
        ]
    },
    {
        id: 'budget',
        title: 'Ваш бюджет?',
        fields: [
            {
                type: 'button',
                value: false,
                placeholder: 'Малый'
            },
            {
                type: 'button',
                value: true,
                placeholder: 'Большой'
            },
        ]
    },
    {
        id: 'more12',
        title: 'Вам больше 12 лет?',
        fields: [
            {
                type: 'button',
                value: false,
                placeholder: 'Нет'
            },
            {
                type: 'button',
                value: true,
                placeholder: 'Да'
            },
        ]
    },
    {
        id: 'durability',
        title: 'Вы планируете брать матрас на длительный срок?',
        fields: [
            {
                type: 'button',
                value: false,
                placeholder: 'Нет'
            },
            {
                type: 'button',
                value: true,
                placeholder: 'Да'
            },
        ]
    },
    {
        id: 'noiz',
        title: 'Является ли важным фактором наличие шума матраса?',
        fields: [
            {
                type: 'button',
                value: false,
                placeholder: 'Нет'
            },
            {
                type: 'button',
                value: true,
                placeholder: 'Да'
            },
        ]
    },
]

export const Survey = {
    state: () => ({
        quests: quests,
        step: 0,
        answers: []
    }),

    getters: {
        getStep(state) {
            return state.step;
        },
        currentQuestData(state) {
            if (!state?.quests[state.step]) return null;

            return state.quests[state.step];
        }
    },

    mutations: {
        setNextStep(state) {
            state.step = ++state.step;
        }
    },

    actions: {
        nextStep({ commit }) {
            commit('setNextStep');
        },
        setNewAnswer({ commit }, answer) {
            
        }
    },

    namespaced: true,
}