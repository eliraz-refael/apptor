(ns app.hooks.fetch
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [hx.react :as hx :refer [defnc]]
			[cljs.core.async :refer [take! put! chan <! >! timeout close!]]
			[hx.hooks :as hooks]
			[cljs-http.client :as http]))


(defn useHttp [url]
  (let [[data set-data] (hooks/useState nil)]
	(hooks/useEffect (fn []
					   (go (let [response (<! (http/get url {:with-credentials? false}))]
							 (set-data (:body response))))
					   ) [])
	[data]))