(ns app.pages.agenda
  (:require [hx.react :as hx :refer [defnc]]
			[cljss.core :refer-macros [defstyles]]
			["@material-ui/core" :as mui]
			[hx.hooks :as hooks]
			[app.layout :refer [main-layout]]
			[app.config :refer [api-map]]
			[app.hooks.fetch :refer [useHttp]]))

(defstyles card []
  {:max-width 345})

(defstyles media []
  {:height 140})

(defnc agenda-page []
  (let [users (useHttp (:get-users api-map))]
	[main-layout
	 [mui/Grid {:container true :spacing 2}
	  (for [user (first users)]
		[mui/Grid {:item true :xs 2}
		 [mui/Card {:className (card)}
		  [mui/CardActionArea
		   [mui/CardMedia {:className (media) :image "https://picsum.photos/450/250.jpg" :title "Image"}]
		   [mui/CardContent
			[mui/Typography {:gutterBottom true :variant "h5" :component "h2"} (:displayName user)]]]
		  [mui/CardActions
		   [mui/Button {:size "small" :color "secondary"} "Schedule now"]]]])]]))
