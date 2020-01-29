(ns app.pages.register
  (:require-macros [cljs.core.async.macros :refer [go go-loop]])
  (:require [hx.react :as hx :refer [defnc]]
			[cljss.core :refer-macros [defstyles]]
			["@material-ui/core" :refer [Container CssBaseline Avatar Typography Grid TextField Button]]
			[cljs.core.async :refer [take! put! chan <! >! timeout close!]]
			[hx.hooks :as hooks]
			[cljs-http.client :as http]
			[app.config :refer [app-config]]
			;; ["@material-ui/icons/LockOutlined" :as LockOutIcon]
			[app.hooks.fetch :refer [useHttp]]
			))

(defstyles paper []
  {:margin-top 60
  :display "flex"
  :flex-direction "column"
  :align-items "center"})

(defstyles form []
  {:width "100%"
   :margin-top 24})

(defn input-box [name label type]
  [Grid {:item true :xs 12 :sm 6}
  [TextField {:name name :variant "outlined" :required true, :fullWidth true, :label label :margin "dense" :type type}]])

(defnc register-page []
  (hooks/useEffect #(.log js/console "Working!") [])
  (let [new-data (useHttp (:dev-server app-config))]
	   [Container {:component "main" :max-width "xs"}
		[CssBaseline]
		[:div (str new-data)]
		[:div {:className (paper)}
		 ;; [Avatar [LockOutIcon]]
		 [Typography {:component "h1" :variant "h5"} "Sign Up"]
		 [:form {:className (form)}
		  [Grid {:container true :spacing 2}
		   (input-box "firstName" "First Name" "text")
		   (input-box "lastName" "Last Name" "text")
		   (input-box "displayName" "Display Name" "text")
		   (input-box "email" "E-mail" "email")
		   (input-box "password" "Password" "password")
		   (input-box "phoneNumber" "Phone Number" "phone")
		   [Grid {:item true :xs 12}
			[Button {:color "secondary" :variant "outlined" :fullWidth true :type "submit"} "Register"]]
		]]]]))

(defn log [msg]
  (.log js/console msg))

(defn request []
  (go (let [response (<! (http/get "https://api.github.com/users"
								   {:with-credentials? false
									:query-params {"since" 135}}))]
		(log (:status response))
		(log (map :login (:body response))))))

