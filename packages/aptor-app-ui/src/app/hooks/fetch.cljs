(ns app.hooks.fetch
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [hx.react :as hx :refer [defnc]]
			[cljs.core.async :refer [<!]]
			[hx.hooks :as hooks]
			[cljs-http.client :as http]))


(defn useHttp [url]
  (let [[data set-data] (hooks/useState nil)
		[loading set-loading] (hooks/useState false)
		[error set-error] (hooks/useState false)]
	(hooks/useEffect
	 (fn []
	   (set-loading true)
	   (go (let [response (<! (http/get url {:with-credentials? false}))]
			 (set-loading false)
			 (if (not (:success response))
			   (set-error true))
			 (set-data (:body response))))) [])
	[[data loading error]]))