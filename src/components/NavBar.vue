<template lang="html">
	<div class="navbar">
		<router-link to="/" class="brand">
			<img src="../assets/img/logo-actuatech.png" />
		</router-link>
	</div>
</template>

<style lang="scss" scoped>
.navbar {
	align-items: center;
	background: #fff;
	border-right: 1px solid #dadde1;
	display: inline-flex;
	flex-direction: column;
	height: 100vh;
	justify-content: center;

	&__anchor {
		color: #bac4d2;
		display: block;
		font-size: 20px;
		margin: 10px 0;

		&:hover,
		&.router-link-exact-active { color: #461ea3; }
	}

	.brand {
		display: block;
		margin-bottom: auto;

		img {
			height: 30px;
			margin: 15px;
		}
	}

	.user {
		margin-top: auto;

		.avatar {
			border-radius: 50%;
			margin: 10px 0;
			width: 30px;
		}
	}
}
</style>
