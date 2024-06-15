## Techncal test task description:

### REACT EXERCISE
( copied for the pdf document received )

We want to develop a currency converter that queries the current daily exchange rates and
allows the user to select the currencies and input an amount to convert.
1. See the image below for reference
2. The design should try to match the image below
3. Behaviour considerations
a. User can select currencies to convert from and to using the dropdowns in the
image below
b. A user can input a value on the left box and the value will be automatically
converted to the appropriate currency value on the right
c. Or a user can input a value on the right and will automatically be converted to
the other currency on the left
d. Responsive behaviour is up to you to define
e. Currency symbols inside the boxes are optional, same as flags inside the
currency dropdown

4. Exchange rates will be obtained querying the following service:
http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml

5. The currencies we will be able to select are the ones present in the above service

PLEASE MAKE SURE:

● Please ensure your code is tested and has a good code coverage
● We want to be able to know how you develop so we will review your commit
history
● Please ensure you have at least one commit within the first hour
● Once you are happy with the code and it’s up to your standards, send us the
Github link to your repository.


## TASK PLANNING
1. The application can be an be a basic SPA, may generate with vite typescript template, it doesn't need any server-side render etc.
However, maybe for the purpose of the role description, may worth consider to create the application with the Next.js ( still tbc, maybe will go with vite spa bolerplate )
2. Technologies to pull-in, try to keep minimal:
   - react.js
   - typescript
   - unit testing with jest or vitest(tbc), react testing library for jsx.
   - data fetch with standard `fetch` api, may need to thing of a package to convert the `xml` into `json`
   - thinking of ui: write myself which is not much from the first look: select, input, loadin skeletons, err display, plus styling plus unit testing, OR pull a UI package ?
   - styling, i think i will use tailwindcss, it doesn't weight much, fast install/setup, speeds up dev process. As an alternative i may just go with css modules.

3. App structuring:
   
- packages installed
- tests jest + rtl setup
- data fetching: curl the api, what does it serve, quick browse their api docs( if any)
- data fetching: unit tests whats expected. Adaptors and fetching util.
- data fetching: when and what: if SPA from where and when shall i fetch, any re-fetch, how fresh the data does need to be? If Next.js( tbc if to use ) - static or dynamic or client fetch, if static how often revalidate, any client-side fetch to keep data up-to-date, check task description ?
- data fetchng: errors
- Application structure: one page, components tree - what is needed: page, title, select currencies + label + input for value, select base currency ( whci is EUR only to my understanding ) + label + input value, loading skeletons, error message ui.
- Error boundary.
- Data flow: if SPA, on mount fetch currencies, feed to select, loading and error cases. If Next.js, fetch (server) with revalidation(~1hr), pass to converter (client), if streaming - loading skeleton for left and right items.

4. Converter local state
- need a value for currently selected currency pair: name, id, multiplier
- need a value for selected currency value controlled input, why controlled? intending to use one inut value for both inputs left and right just with the different multiplier, 1 state but 2 interpretation

```sh
# selected currency pair
State: 'USD/EUR', 1.07
# selected currency value
State: 1
# Selected curency input display
InputUSD: 1*1 = 1
# Base curency input display
InputEUR: 1/1.07 = 0.93457
```

- Still the logic to be confirmed, not sure , maybe something simpler could be done.
- When logic is confirmed: how test? keep in component - test the component + logic? OR move into hook, then test the hook logic, and rendering in component?

5. UI
- theme colors: from template got marine blue: 3 colors, font colors: white and light-grey
- breakpoints: xs, sm, md, lg, 2lg, will use default tailwind theme breakpoints
- accessibility: i have page, heading, 2 selects, 2 inputs, i will see with https://developer.mozilla.org/en-US/docs/Web/Accessibility, https://www.a11yproject.com/checklist, https://a11y-101.com/development

## DEPLOYED VERSION

can be viewed at: https://currency-converter-for-artfinder.vercel.app/


## NEXT.JS BOLERPLATE DOCS BELOW

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
