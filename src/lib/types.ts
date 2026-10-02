import type { VariantProps } from "class-variance-authority";
import type { Result as NeverthrowResult } from "neverthrow";
import type { ComponentProps } from "react";
import type { z } from "zod/v4";

import type { examples } from "@/db/schema";
import type { buttonVariants } from "@/lib/constants/button";
import type { ErrorCode, HttpVerb, LogLevel } from "./enums";
import type { createExampleSchema } from "./examples-schema";

// ─── Core Framework Types ─────────────────────────────────────────────────

export interface IFetchOptions<TBody = unknown> {
  url: string;
  method: HttpVerb;
  token?: string;
  body?: TBody;
  headers?: Record<string, string>;
}

export interface IFetchResponse<T = unknown> {
  data: T | null;
  ok: boolean;
  status: number;
  error: string | null;
}

export interface ISuccess<T> {
  data: T;
  error: null;
}

export interface IFailure<E> {
  data: null;
  error: E;
}

export type TResult<T, E = Error> = ISuccess<T> | IFailure<E>;

export interface IError<TCode extends ErrorCode = ErrorCode> {
  code: TCode;
  message: string;
  details?: unknown;
}

export interface IAppError {
  code: ErrorCode;
  message: string;
  context?: Record<string, unknown>;
}

export interface IFormActionResponse {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

// ─── Action Framework ────────────────────────────────────────────────────

export interface IActionDefinition<
  TInput,
  TOutput,
  TCode extends ErrorCode = ErrorCode,
> {
  parse: (rawInput: unknown) => NeverthrowResult<TInput, IError<TCode>>;
  handler: (
    payload: IActionPayload<TInput>,
  ) => Promise<NeverthrowResult<TOutput, IError<TCode>>>;
}

export type TActionResult<
  TOutput,
  TCode extends ErrorCode = ErrorCode,
> = TResult<TOutput, IError<TCode>>;

export interface IActionContext {
  userId: string | null;
  role: string | null;
}

export interface IAuthenticatedContext {
  userId: string;
  role: string | null;
}

export interface IActionPayload<TInput> {
  input: TInput;
  context: IAuthenticatedContext;
}

// ─── Auth ─────────────────────────────────────────────────────────────────

export type TAuthErrorCodes = ErrorCode.Unauthorized;

// ─── Example Domain ───────────────────────────────────────────────────────

export type TExampleRecord = typeof examples.$inferSelect;

export type TCreateExampleInput = z.infer<typeof createExampleSchema>;

export interface IExampleDto {
  id: number;
  name: string;
  createdAt: string;
}

export type TExampleActionErrorCodes =
  | ErrorCode.InvalidForm
  | ErrorCode.ValidationError
  | ErrorCode.DbCreateFailed;

export interface IExamplesResponse {
  data: IExampleDto[];
}

export interface IListExamplesOptions {
  limit?: number;
}

// ─── SEO Types ────────────────────────────────────────────────────────────

export interface ISeoConfig {
  title: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

// ─── SEO Schema Types (JSON-LD) ──────────────────────────────────────────

export interface IBreadcrumbItem {
  name: string;
  url: string;
}

export interface IWebsiteSchemaConfig {
  name: string;
  description: string;
  url: string;
  alternateName?: string | string[];
}

export interface IOrganizationSchemaConfig {
  name: string;
  url: string;
  logoUrl?: string;
  sameAs?: string[];
}

export interface IJsonLdProps {
  data: Record<string, unknown>;
}

// ─── Hook Internal Types ──────────────────────────────────────────────────

export interface IRevealObserverRegistry {
  observer: IntersectionObserver;
  handlers: Map<Element, () => void>;
}

export interface IRevealProps {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  threshold?: number;
  stagger?: boolean;
}

export interface IDoodleDrawOnProps {
  className?: string;
  threshold?: number;
}

// ─── Client Error Logging ────────────────────────────────────────────────

export interface IClientLogConfig {
  module: string;
  stage: string;
  errorType?: string;
  level?: LogLevel;
  context?: Record<string, unknown>;
}

// ─── Analytics ────────────────────────────────────────────────────────────

export interface IBaseEventParams {
  page_location?: string;
  page_title?: string;
}

export interface IPurchaseItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  item_variant?: string;
  price: number;
  quantity: number;
}

export interface IPurchaseParams extends IBaseEventParams {
  transaction_id: string;
  value: number;
  currency: string;
  tax?: number;
  shipping?: number;
  items: IPurchaseItem[];
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface IUTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface IEventRecord {
  signature: string;
  timestamp: number;
}

export interface IEventSignature {
  eventName: string;
  params: Record<string, unknown>;
}

export interface IWebVitalsLibMetric {
  name: string;
  value: number;
  rating: string;
  delta: number;
  id: string;
}

export type TAnalyticsPlatform = "GA4";

export interface IEventLogData {
  platform: TAnalyticsPlatform;
  event: string;
  params?: Record<string, unknown>;
  eventId?: string;
}

export interface IMeasurementEventPayload {
  client_id: string;
  events: Array<{
    name: string;
    params: Record<string, unknown>;
  }>;
}

// ─── Sentry / Observability ───────────────────────────────────────────────

export interface ISentryLogConfig {
  module: string;
  stage: string;
  errorType?: string;
  level?: LogLevel;
  context?: Record<string, unknown>;
  tags?: Record<string, string>;
}

export type TDataHealthValue =
  | string
  | unknown[]
  | Record<string, unknown>
  | null
  | undefined;

export interface IDataHealthConfig {
  field: string;
  criticality: string;
  context?: Record<string, unknown>;
}

// ─── Logger ───────────────────────────────────────────────────────────────

export interface ILoggerConfig {
  level: string;
  context: string;
  message: string;
  metadata?: Record<string, unknown>;
}

// ─── Component Prop Types ──────────────────────────────────────────────

export interface IFieldErrorProps {
  errors?: string[] | undefined;
  className?: string;
}

export interface IWhatsOnEvent {
  id: string;
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  ctaLabel: string;
  mobileCtaLabel?: string;
}

export interface IReadMoreProps {
  children: React.ReactNode;
  className?: string;
}

export interface ICloseButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export interface ISentryErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface ISentryErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export interface ITrackEventProps {
  eventName: string;
  params?: Record<string, unknown>;
}

// ─── Navigation ─────────────────────────────────────────────────────────

export interface INavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface INavGroup {
  label: string;
  links: INavLink[];
}

export interface IBreadcrumbsProps {
  items: IBreadcrumbItem[];
}

export interface IBreadcrumbTrailProps {
  items: IBreadcrumbItem[];
}

// ─── Cookie Consent ────────────────────────────────────────────────────

export interface ICookieConsentRecord {
  status: string;
  version: number;
  timestamp: string;
}

// ─── Homepage Content ───────────────────────────────────────────────────

export interface ISectionImage {
  src: string;
  alt: string;
}

export interface IHeroContent {
  eyebrow: string;
  headingLines: readonly [string, string, string];
  description: string;
  bookingLabel: string;
  callLabel: string;
  backgroundImage: ISectionImage;
  entranceBackground: ISectionImage;
  entranceImage: ISectionImage;
  entranceCaption: string;
}

export interface IMenusContent {
  eyebrow: string;
  heading: string;
  description: string;
  categoriesLabel: string;
  categories: readonly string[];
  ctaLabel: string;
  image: ISectionImage;
}

export interface IWineContent {
  eyebrow: string;
  heading: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  image: ISectionImage;
}

export interface IBookingBannerContent {
  heading: string;
  emphasizedHeading: string;
  description: string;
  ctaLabel: string;
  image: ISectionImage;
}

export interface IHumanHospitalityContent {
  eyebrow: string;
  heading: string;
  description: string;
  phoneAction: INavLink;
  emailAction: INavLink;
  image: ISectionImage;
}

export interface INavbarBrandProps {
  onClick?: () => void;
}

export interface INavbarContent {
  navigationLabel: string;
  homeLabel: string;
  navigationLabels: readonly string[];
  visitContactLabel: string;
  giftVouchersLabel: string;
  bookingLabel: string;
  mobileBookingLabel: string;
}

export interface IMobileNavigationProps {
  brandPhraseClassName: string;
}

export interface IMobileNavigationItem {
  id: string;
  label: string;
  children?: readonly string[];
}

export interface IMobileNavigationOpeningHours {
  days: string;
  hours: string;
}

export interface IMobileNavigationContent {
  openLabel: string;
  closeLabel: string;
  title: string;
  navigationLabel: string;
  items: readonly IMobileNavigationItem[];
  giftVouchersLabel: string;
  openingHoursHeading: string;
  openingHours: readonly IMobileNavigationOpeningHours[];
  address: string;
  phoneAction: INavLink;
  emailAction: INavLink;
  brandPhrase: string;
}

export interface IFooterOpeningHours {
  days: string;
  hours: string;
}

export interface IFooterLegalItem {
  label: string;
  mobileLabel: string | null;
}

export interface IFooterContent {
  homeLabel: string;
  address: string;
  tagline: string;
  contactHeading: string;
  openingHoursHeading: string;
  openingHours: readonly IFooterOpeningHours[];
  exploreHeading: string;
  exploreLabels: readonly string[];
  newsletter: {
    heading: string;
    description: string;
    emailLabel: string;
    submitLabel: string;
    status: string;
  };
  copyright: string;
  legalNavigationLabel: string;
  legalItems: readonly IFooterLegalItem[];
  instagramLabel: string;
  facebookLabel: string;
}

export interface IRestaurantFeature {
  title: string;
  description: string;
  illustration: string;
}

export interface IRestaurantFeaturesContent {
  sectionLabel: string;
  items: readonly IRestaurantFeature[];
}

export interface IStoryContent {
  eyebrow: string;
  heading: string;
  headingContinuation?: string;
  description?: string;
  ctaLabel: string;
  image: ISectionImage;
}

export interface IStoriesContent {
  eyebrow: string;
  headingLines: readonly [string, string];
  description: string;
  ctaLabel: string;
  family: IStoryContent;
  produce: IStoryContent;
  gina: IStoryContent;
  art: IStoryContent;
}

export interface IGroupOccasion {
  title: string;
  description: string;
  mobileDescription?: string;
  image: string;
  imageAlt: string;
  minHeight: number;
}

export interface IGroupsOccasionsContent {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
  cardCtaLabel: string;
  image: ISectionImage;
  occasions: readonly IGroupOccasion[];
}

export interface IWhatsOnContent {
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
}

export interface IStoryActionProps {
  label: string;
  filled?: boolean;
}

export interface IEventActionProps {
  label: string;
  mobileLabel?: string;
}

export interface IEventCardProps {
  event: IWhatsOnEvent;
  featured?: boolean;
}

export interface IWhatsOnProps {
  events: readonly IWhatsOnEvent[];
}

export interface IButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
