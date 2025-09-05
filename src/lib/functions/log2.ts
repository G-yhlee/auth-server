const log2 =
	<A>(str: string) =>
	(x: A): A => {
		console.log(str);
		console.log(x);
		return x;
	};

export default log2;
