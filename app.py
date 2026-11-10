# -*- coding: utf-8 -*-
import streamlit as st
import pandas as pd

# Page configuration
st.set_page_config(page_title="ENERGIA", page_icon="⚡", layout="wide")

# Title
st.title("⚡ ENERGIA - Nigeria Energy Access Prioritization")
st.subheader("AI-Powered Site Ranking Dashboard")

# Sidebar
st.sidebar.header("⚙️ Model Settings")
st.sidebar.markdown("Adjust weights to prioritize different factors:")

weight_deficit = st.sidebar.slider("Grid Deficit Weight", 0.0, 1.0, 0.5)
weight_solar = st.sidebar.slider("Solar Potential Weight", 0.0, 1.0, 0.3)
weight_population = st.sidebar.slider("Population Weight", 0.0, 1.0, 0.2)

# Real Data from World Bank, NBS, and Global Solar Atlas
data = {
    'State': ['Borno', 'Sokoto', 'Kano', 'Kaduna', 'Katsina', 'Oyo', 'Enugu'],
    'Grid_Deficit_%': [85, 80, 70, 65, 75, 40, 35],
    'Solar_Potential_kWh': [5.45, 5.56, 5.55, 5.22, 5.50, 4.50, 4.20],
    'Population_Millions': [5.8, 6.5, 15.67, 10.0, 10.66, 8.2, 5.3],
    'IDPs': [1711481, 0, 15549, 0, 244380, 0, 0]
}

df = pd.DataFrame(data)

# Calculate scores
df['Score'] = (df['Grid_Deficit_%'] * weight_deficit) + (df['Solar_Potential_kWh'] * weight_solar) + (df['Population_Millions'] * weight_population)

# Normalize score to 0-100
df['Score'] = (df['Score'] / df['Score'].max()) * 100

# Rank
df['Rank'] = df['Score'].rank(ascending=False, method='min').astype(int)

# Sort
df_sorted = df.sort_values('Rank')

# Display metrics
col1, col2, col3, col4 = st.columns(4)
col1.metric("Total States", len(df))
col2.metric("Top Priority", df_sorted.iloc[0]['State'])
col3.metric("Highest Score", f"{round(df_sorted.iloc[0]['Score'], 1)}%")
col4.metric("Population Covered", f"{df['Population_Millions'].sum():,.1f}M")

st.divider()

# Ranking table
st.subheader("📊 State Ranking by Priority Score")
st.dataframe(
    df_sorted[['Rank', 'State', 'Grid_Deficit_%', 'Solar_Potential_kWh', 'Population_Millions', 'Score']],
    use_container_width=True,
    hide_index=True
)

# Top 3
st.divider()
st.subheader("🏆 Top 3 Priority States for Energy Intervention")
top3 = df_sorted.head(3)
for i, row in top3.iterrows():
    st.success(f"**#{row['Rank']}** - {row['State']} (Score: {round(row['Score'], 1)}%)")

# IDP Data
st.divider()
st.subheader("🆘 Internally Displaced Persons (IDPs) by State")
idp_data = df_sorted[df_sorted['IDPs'] > 0][['State', 'IDPs']]
st.dataframe(idp_data, use_container_width=True, hide_index=True)
st.caption("Source: UNHCR / NBS 2023")

# Footer
st.divider()
st.caption("⚡ ENERGIA - AI-Powered Energy Access Intelligence Platform")
st.caption("Data: Real data from World Bank, NBS & Global Solar Atlas (2023-2024)")