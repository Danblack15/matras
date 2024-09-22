import matrasData from '@/assets/matras.json';

export const filterMatras = (answers) => {
    let answersParams = {};

    answers.forEach(answer => {
        answersParams[answer.id] = answer.value;
    });

    return matrasData.filter(matras => {
        const { params } = matras;

        return JSON.stringify(params) == JSON.stringify(answersParams);
    });
};