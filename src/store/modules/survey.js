import { filterMatras } from '@/helpers/filterMatras';

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
    // {
    //     id: 'personParameters',
    //     title: 'Ваш рост и вес',
    //     fields: [
    //         {
    //             type: 'input',
    //             value: 'number',
    //             placeholder: 'Рост'
    //         },
    //         {
    //             type: 'input',
    //             value: 'number',
    //             placeholder: 'Вес'
    //         },
    //     ]
    // },
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
                placeholder: 'Малый',
                removeQuests: ['more12', 'durability', 'noizFact']
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
                placeholder: 'Нет',
                removeQuests: ['durability', 'noizFact']
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
        id: 'noizFact',
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
        answers: [],
        result: [],
    }),

    getters: {
        getStep(state) {
            return state.step;
        },
        currentQuestData(state) {
            if (!state?.quests[state.step]) return null;

            return state.quests[state.step];
        },
        getResult(state) {
            return state.result;
        }
    },

    mutations: {
        setNextStep(state) {
            state.step = ++state.step;
        },
        setNewAnswer(state, data) {
            state.answers.push(data);
        },
        setResult(state) {
            const result = filterMatras(state.answers);

            state.result = result;
        },
        refreshQuests(state, removeItems) {
            const tempQuest = [...state.quests];

            state.quests = state.quests.filter(quest => {
                return !removeItems.find(item => item == quest.id);
            });

            const skippedQuests = tempQuest.filter(quest => {
                return removeItems.find(item => item == quest.id);
            })
            
            skippedQuests.forEach(quest => {
                state.answers.push({
                    id: quest.id,
                    value: false
                });
            });

            console.log(state.answers);
        }
    },

    actions: {
        nextStep({ commit, state }) {
            commit('setNextStep');

            if (state.step == state.quests.length)
                commit('setResult')
        },
        addNewAnswer({ commit }, questData) {
            const { id } = questData.quest,
                { value } = questData.field;

            commit('setNewAnswer', {id, value});

            const selectedField = questData.quest.fields.filter(field => field.value === value)[0];

            if (!selectedField?.removeQuests?.length) return;

            commit('refreshQuests', selectedField.removeQuests)
        },
    },

    namespaced: true,
}