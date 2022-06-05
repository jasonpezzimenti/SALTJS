// SALT
-> {
	question: "What's your name?";

	out with question, expect input {
		out with "Hello, " + Console.Input + ".";
	}
}

// C#
string question = "What's your name?";
Console.WriteLine(question);
string name = Console.ReadLine();
Console.WriteLine("Hello, " + name + ".");