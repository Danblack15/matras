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
			<p @click="nextStep">{{ step }}</p>

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
						@click="nextStep"
					>{{ field.placeholder }}</ButtonUI>
				</div>
			</div>
			<ButtonUI 
				v-if="quest.fields[0].type == 'input'" 
				white
				@click="nextStep"
			>Далее</ButtonUI>
		</div>

		<div v-if="!quest">
			<h1>Конец!</h1>
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
			nextStep: 'survey/nextStep'
		})
	},
	computed: {
		...mapGetters({
			step: 'survey/getStep',
			quest: 'survey/currentQuestData'
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
</style>