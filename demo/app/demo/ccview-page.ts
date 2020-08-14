import { CreditCardView, Source, Stripe, Token } from "nativescript-stripe";
import { EventData, fromObject } from "@nativescript/core";
import { Button } from "@nativescript/core";
import { Page } from "@nativescript/core";
import { publishableKey } from "./stripe.service";

let stripe: Stripe;
let tokenSource = fromObject({ token: "" });

export function pageLoaded(args: EventData) {
  if (-1 !== publishableKey.indexOf("pk_test_yours")) {
    throw new Error("publishableKey must be changed from placeholder");
  }
  stripe = new Stripe(publishableKey);
  tokenSource.set("token", "");

  let page = <Page>args.object;
  page.bindingContext = tokenSource;
}

export function createToken(args: EventData) {
  tokenSource.set("token", "Fetching token...");

  let page = (<Button>args.object).page;
  let ccView: CreditCardView = page.getViewById("card");
  stripe.createToken(ccView.card, (error, token) => {
    let value = error ? error.message : formatToken(token);
    tokenSource.set("token", value);
  });
}

export function createSource(args: EventData) {
  tokenSource.set("source", "Fetching Source...");

  let page = (<Button>args.object).page;
  let ccView: CreditCardView = page.getViewById("card");
  stripe.createSource(ccView.card, (error, source) => {
    let value = error ? error.message : formatSource(source);
    tokenSource.set("source", value);
  });
}

function formatToken(token: Token): string {
  return `ID: ${token.id}\nCard: ${token.card.brand} (...${token.card.last4})`;
}

function formatSource(source: Source): string {
  return `ID: ${source.id}\nCard: ${source.card.brand} (...${source.card.last4})`;
}
