(ns app.pages.service-givers
  (:require [hx.react :as hx :refer [defnc]]
			[cljss.core :refer-macros [defstyles]]
			["@reach/router" :refer [navigate]]
			["@material-ui/core" :as mui]
			[hx.hooks :as hooks]
			[app.layout :refer [main-layout]]
			[app.config :refer [api-map]]
			[app.hooks.fetch :refer [useHttp]]))

(defstyles card []
  {:max-width 345})

(defstyles media []
  {:height 140})

(defnc service-givers-page []
  (let [[users loading error] (useHttp (:get-users api-map))]
	[main-layout
	 [:div "Loading: " (str loading)]
	 [:div "Error: " (str error)]
	 [mui/Grid {:container true :spacing 2}
	  (for [user (first users)]
		[mui/Grid {:item true :xs 2}
		 [mui/Card {:className (card)}
		  [mui/CardActionArea {:onClick #(navigate (str "/agenda/" (:_id user)))}
		   [mui/CardMedia {:className (media) :image "https://picsum.photos/450/350.jpg" :title "Image"}]
		   [mui/CardContent
			[mui/Typography {:gutterBottom true :variant "h5" :component "h2"} (:displayName user)]]]
		  [mui/CardActions
		   [mui/Button {:size "small" :color "secondary" :onClick #(navigate (str "/agenda/" (:_id user)))} "Schedule now"]]]])]]))
