
CREATE TABLE public.buy_now_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product TEXT NOT NULL,
  email TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.buy_now_events TO anon, authenticated;
GRANT ALL ON public.buy_now_events TO service_role;

ALTER TABLE public.buy_now_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert buy now events"
  ON public.buy_now_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
