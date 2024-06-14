import type { MetaFunction } from "@remix-run/node";


export const meta: MetaFunction = () => {
  return [
    { title: "Rizz Store" },
    { name: "The place to Gyata go for the best items", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main>
    </main>
  );
}
