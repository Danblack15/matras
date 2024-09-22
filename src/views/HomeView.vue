<template>
	<main>
		<div class="quest-wrapper" v-if="!isStated">
			<h1>Выбираем матрас?</h1>
			<ButtonUI 
				white 
				@click="isStated = true"
			>Да</ButtonUI>
		</div>

		<div class="quest-wrapper" v-else-if="quest">
			<h1>{{ quest.title }}</h1>
			<div class="answer-wrapper">
				<div v-for="field in quest.fields" class="answer">
					<input 
						v-if="field.type == 'input'" 
						:type="field.value" 
						:placeholder="field.placeholder"
					/>
					<ButtonUI 
						v-if="field.type == 'button'" 
						white
						@click="next(quest, field)"
					>{{ field.placeholder }}</ButtonUI>
				</div>
			</div>
			<ButtonUI 
				v-if="quest.fields[0].type == 'input'" 
				white
				@click="nextStep"
			>Далее</ButtonUI>
		</div>

		<div v-if="!quest" class="result-wrapper">
			<h1>Ваш выбор</h1>
			<div class="card-list" >
				<a 
					class="card" 
					v-for="card in result" 
					:href="card.link"
					target="_blank"
					:key="card.id"
				>
					<div class="card__image">
						<img :src="card.image" />
					</div>
					<p>{{ card.title }}</p>
				</a>
			</div>
		</div>
	</main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	data() {
		return {
			isStated: false,
		}
	},	
	mounted() {
		
	},	
	methods: {
		...mapActions({
			nextStep: 'survey/nextStep',
			setAnswer: 'survey/addNewAnswer',
		}),
		next(quest, field) {
			const questData = {
				quest: quest,
				field: field,
			}
			
			this.setAnswer(questData);
			this.nextStep();
		}
	},
	computed: {
		...mapGetters({
			step: 'survey/getStep',
			quest: 'survey/currentQuestData',
			result: 'survey/getResult'
		})
	}
}
</script>

<style lang="sass">
.quest-wrapper
	display: flex
	flex-direction: column
	align-items: center
	gap: 16px

.answer-wrapper 
	display: flex
	gap: 20px
	margin-top: 16px

	input
		font-size: 16px
		padding: 8px
		border: none
		outline: none
		&::placeholder
			color: black

.answer
	width: 50%

.result-wrapper
	width: 50vw
	h1
		text-align: center

.card-list
	display: flex
	flex-wrap: wrap
	gap: 16px
	margin-top: 25px

	& ~ h1
		text-align: center

.card
	width: 100%
	display: flex
	flex-direction: column
	gap: 8px

	animation-name: cardScale
	animation-duration: .8s
	animation-fill-mode: forwards
	animation-timing-function: cubic-bezier(.15,1.01,.3,1.17)
	transform: scale(0)

	&:hover
		.card__image img
			transform: scale(1.1)
		> p
			color: green
	
	> p
		font-size: 26px
		font-weight: 500
		transition: .3s ease
	
.card__image
	position: relative
	aspect-ratio: 828 / 466
	width: 100%
	height: auto
	border-radius: 15px
	overflow: hidden

	img
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		object-fit: cover
		transition: .3s ease

@keyframes cardScale
	100%
		transform: scale(1)
	
</style>